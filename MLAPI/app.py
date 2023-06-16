from flask import Flask, request, jsonify
from PIL import Image
import io
import base64
import tensorflow as tf
from tensorflow import keras
import numpy as np
import mysql.connector
import requests

app = Flask(__name__)

# Function to preprocess the image
def preprocess_image(image_base64):
    # Logic to preprocess the image
    # Example: preprocessed_image = ...
    # Return the preprocessed image
    image_array = np.array(image_base64)
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

# Function to load the model
def load_model(model_path):
    model = tf.keras.models.load_model(model_path, compile=False)

    losses = {
        'class_label': 'categorical_crossentropy',
        'bounding_box': 'mean_squared_error'
    }

    lossWeights = { 
        'class_label': 1.,
        'bounding_box': 1.
    }

    model.compile(loss=losses, optimizer=tf.keras.optimizers.Adam(0.0001), loss_weights=lossWeights, metrics=['accuracy'])
    return model

# Fetch image from Cloud SQL and process for prediction
@app.route('/predict', methods=['GET'])
def predict_image():
    try:
        # Connect to the Cloud SQL database
        connection = mysql.connector.connect(
            host='34.101.146.65',
            port='3306',
            database='apiV1',
            user='root',
            password='1234509876'
        )

        # Retrieve the latest image URL from the Cloud SQL database
        cursor = connection.cursor()
        query = "SELECT url FROM images ORDER BY id DESC LIMIT 1"
        cursor.execute(query)
        result = cursor.fetchone()

        if not result:
            return jsonify({'error': 'Image not found'})

        image_url = result[0]
        # Fetch the image data from Cloud Storage
        response = requests.get(image_url)
        image_data = response.content

        # Convert the image data to a PIL Image object
        image_base64 = base64.b64encode(image_data).decode('utf-8')
        image_bytes = io.BytesIO(base64.b64decode(image_base64))
        image_base64 = Image.open(image_bytes).resize((150,150))

        # Preprocess the image
        preprocessed_image = preprocess_image(image_base64)

        # Load the model
        model = load_model('model1.h5')

        # Perform prediction on the preprocessed image
        box_preds, label_preds = model.predict(preprocessed_image)
        label_preds = np.argmax(label_preds, axis=1)[0]
        box_preds = box_preds[0]

        x_start, y_start, x_end, y_end = box_preds

        # Logic for prediction result
        classes = np.array(['Actinic Keratosis', 'Basa Cell Carcinoma', 'Eksim', 'Flek Hitam','Herpes', 'Kerutan', 'Milia', 'Rosacea', 'Vitiligo', 'jerawat'])
        preds = classes[label_preds]
        return jsonify({'prediction': preds,
                        'x_start': str(x_start),
                        'y_start': str(y_start),
                        'x_end': str(x_end),
                        'y_end': str(y_end)})

    except Exception as e:
        print('Error processing image:', e)
        return jsonify({'error': 'Image processing failed'})

if __name__ == '__main__':
    app.run(debug=True)
