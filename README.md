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
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/Capstone-C23-PC612-FacialBot/FacialBot-CC-API/blob/3755635c6eb6eed2b951675038962410549d8f26/Screenshot%202023-06-08%20093017.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/Capstone-C23-PC612-FacialBot/FacialBot-CC-API/blob/3755635c6eb6eed2b951675038962410549d8f26/Screenshot%202023-06-08%20093017.png">
  <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://github.com/Capstone-C23-PC612-FacialBot/FacialBot-CC-API/blob/3755635c6eb6eed2b951675038962410549d8f26/Screenshot%202023-06-08%20093017.png">
</picture>
