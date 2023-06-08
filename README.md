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
  + `name` as `string`
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
