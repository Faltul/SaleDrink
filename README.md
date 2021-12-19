# SaleDrink 
SaleDrink.ApplicationAPI - приоложение asp.net core web api
WebUI - reactJs приложение


Запуск WebUI с помощью react-scripts start
1. В командной строке перейти в WebUI\WebUI\ClientApp
2. Выполнить команду 'npm install'
3. Выполнить команду 'set HTTPS=true&&npm start'
4. Адрес пользовательского UI приложения должен быть 'https://localhost:3000'
5. Скорее всего потребуется устоновить ssl сертификат. Импортиртиовать его в файл и установить в доверенные корневые центры сертификации
6. WebUI\WebUI\ClientApp\src\constant\Settings.ts  поле 'ApplicationAPIBaseUrl' содержит адрес серверного API. Пример 'https://localhost:44380/api'

https://localhost:3000 - страница с выбором напитка 
https://localhost:3000/Managment/{key} - страница администрирования. key храниться в файле конфигурации WebAPI (appsettings.json). Пример 'https://localhost:3000/Managment/896718e0-bcda-4e34-b2a4-7280b3c056d9'

Запуск SaleDrink.ApplicationAPI
1. Запуск осущевстляется из visualStudio
