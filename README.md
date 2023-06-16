# FacialBot
> API untuk menjalankan aplikasi FacialBot dan upload gambar dari gallery (API to run the FacialBot application and upload images from the gallery)

## Endpoint
[Github FacialBot API](https://github.com/Capstone-C23-PC612-FacialBot/FacialBot-CC-API.git)

## Register
- URL
  + `/register`

- Method
  + POST

- Request Body
  + `username` as `string`
  + `email` as `string`, must be unique
  + `password` as `string`, at least 8 characters
 
 - Response
 
 ```ruby
 {"message":"Registrasi Berhasil!"}
 ```

## Login
- URL
  + `/login`

- Method
  + POST

- Request Body
  + `email` as `string`
  + `password` as `string`
 
- Response
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/Capstone-C23-PC612-FacialBot/FacialBot-CC-API/blob/3755635c6eb6eed2b951675038962410549d8f26/Screenshot%202023-06-08%20093017.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/Capstone-C23-PC612-FacialBot/FacialBot-CC-API/blob/3755635c6eb6eed2b951675038962410549d8f26/Screenshot%202023-06-08%20093017.png">
  <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://github.com/Capstone-C23-PC612-FacialBot/FacialBot-CC-API/blob/3755635c6eb6eed2b951675038962410549d8f26/Screenshot%202023-06-08%20093017.png">
</picture>

## Upload Image
- URL
  + `/upload`

- Method
  + POST

- Request Body
  + `photo` as `file`, no limited File Size

- Response
```ruby
{
  msg: 'File telah diupload!',
  file: publicUrl,
}
```

## Flask Image Prediction API

> This is a Flask API that performs image prediction using a pre-trained model. It fetches an image from a Cloud SQL database, preprocesses it, and then passes it through the model for prediction.

### Instalation
+ Clone the repository
+ Open a terminal and navigate to the repository directory
+ Install the required dependencies by running the following command

```
python app.py
```

The application will run on `http://localhost:3000`

Endpoint
+ `/predict`  [POST]: Predicts the class label and bounding box of an image. Request body should contain the base64 encoded image in the following format:
```ruby
{
  "image": "base64_encoded_image"
}
```

Example request using cURL :
```ruby
curl -X POST -H "Content-Type: application/json" -d '{"image": "base64_encoded_image"}' http://localhost:3000/predict
```

Example response :
```ruby
{
  "prediction": "Actinic Keratosis",
  "bbox": [0.1, 0.2, 0.3, 0.4]
}
```

Replace `base64_encoded_image` with the actual base64 encoded image you want to predict.

### Contributing
Contributions from the community are welcome. If you would like to contribute to this project, please follow these steps:

+ Fork this repository.
+ Create a new branch: `git checkout -b new-feature`.
+ Make the necessary changes and commit: `git commit -am 'Add new feature'`.
+ Push to the newly created branch: `git push origin new-feature`.
+ Create a pull request in this repository.

