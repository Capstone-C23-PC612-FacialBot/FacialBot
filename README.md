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
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/25423296/163456776-7f95b81a-f1ed-45f7-b7ab-8fa810d529fa.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
  <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
</picture>
