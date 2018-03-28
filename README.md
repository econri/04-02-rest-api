# Доклад №4: "Каналы передачи данных. Защита информации."

### Пример №2. Пример построения REST API

##### Установка и запуск

1. Установить [Node.js](https://nodejs.org/en/) и [Git](https://git-scm.com/downloads) (по желанию)
2. Установить [PostgreSQL](https://www.postgresql.org/download/)
3. Клонировать или загрузить проект в виде архива

В консоли/терминале:
``` bash
# Перейти в папку, в которую планируется клонирование проекта, например:
$ cd /Projects
# Клонировать проект из репозитория
$ git clone https://github.com/econri/04-02-rest-api.git
```

4. Проверить подключение к базе и внести в нее данные

В консоли/терминале:

``` bash
# Перейти в папку проекта
$ cd 03-05-nginx-balancer
# Установить пакеты зависимостей
$ npm install
# Установить глобально модуль migrate
$ npm install migrate -g
# Синхронизировать модели с таблицами в базе данных
# Убедитесь, что у вас существует в базе пользователь "postgres" (предустановленный пользователь) 
# и у него пароль "postgres" (обычно предустановленный пароль, в случае если меняли - измените пароль в './server/configs/config.js' на свой)
$ npm run syncDB
# Внесите данные из файлов ('./server/db/datasets') в базу данных
$ migrate down
$ migrate up
```

5. Запустить серверное приложение

В консоли/терминале:

``` bash
# Запустить
$ npm start
```

Web-приложение будет запущено по адресу http://localhost:3000

*В случае, если Вы решите создать своего пользователя базой данных и создать ему отдельную базу данных, не забудьте изменить конфигурации подключения к базе данных в файле './server/db/datasets'*

*В примере приводятся 3 конечные точки API, файлы описания которых расположены в './server/routes/api'*

Для тестирования API сервера можно использовать приложение [Postman](https://www.getpostman.com/docs/v6/)
