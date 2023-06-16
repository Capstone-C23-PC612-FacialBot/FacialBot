# FacialBot
> API untuk menjalankan aplikasi FacialBot dan upload gambar dari gallery (API to run the FacialBot application and upload images from the gallery)

## Endpoint
[Github FacialBot API](https://github.com/Capstone-C23-PC612-FacialBot/FacialBot-CC-API.git)

## Register
- URL
  + `/api/register`

- Method
  + POST

- Request Body
  + `username` as `string`
  + `email` as `string`, must be unique
  + `password` as `string`, at least 8 characters
 
 - Response
 
 ```ruby
 {
    "statusCode": 201,
    "data": [
        {
            "id": "id_user",
            "access_token": "token"
        }
    ]
}
 ```

## Login
- URL
  + `/api/login`

- Method
  + POST

- Request Body
  + `email` as `string`
  + `password` as `string`
 
- Response
 ```ruby
 {
    "statusCode": 200,
    "data": [
        {
            "id": "id_user",
            "access_token": "token"
        }
    ]
}
 ```

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
    "statusCode": 200,
    "data": {
        "message": "Upload successful!",
        "file": publicUrl
    }
}
```

## Flask Image Prediction API

> This is a Flask API that performs image prediction using a pre-trained model. It fetches an image from a Cloud SQL database, preprocesses it, and then passes it through the model for prediction.

### Instalation
+ Make a Compute Engine Instance
+ Clone the repository
+ Go to directory cd FacialBot-CC-API/MLAPI
+ Install Python3
+ Install and create Virtual Environment
+ Install the required dependencies by running the following command

```
pip install -r requirments
```

The application will run on `http://<Instance_External_IP>:5000`

Endpoint
+ `/predict`  [GET]: Predicts the class label and bounding box of an image. Request body should contain the base64 encoded image in the following format:
```ruby
{
    "prediction": preds,
    "x_end": str(x_start),
    "x_start": str(y_start),
    "y_end": str(x_end),
    "y_start": str(y_end)
}
```


### Contributing
Contributions from the community are welcome. If you would like to contribute to this project, please follow these steps:

+ Fork this repository.
+ Create a new branch: `git checkout -b new-feature`.
+ Make the necessary changes and commit: `git commit -am 'Add new feature'`.
+ Push to the newly created branch: `git push origin new-feature`.
+ Create a pull request in this repository.

