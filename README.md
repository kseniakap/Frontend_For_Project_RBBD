###Цель работы: 
Создать платформу, на которой пользователи смогут быстро находить текст необходимой песни и комментировать ее содержание.
Исходный данные:
Документация к языку JavaScript, фреймворку React и СУБД MongoDB.
Априорные представления:
WEB-приложение, которое может реализовать следующие функции:
·	Авторизация / регистрация пользователя
·	Разделение пользователей по ролям: неавторизованный пользователь и авторизованный пользователь и администратор
Неавторизованный пользователь может:
·	Просматривать текст песни
·	Осуществлять поиск песен по названию и исполнителю
Обычный пользователь может делать все то, что и неавторизованный и плюс:
·	Добавлять новую песню (но перед публикацией запись идет на проверку администратору) 
·	Добавлять комментарии к записям других пользователей
Администратору предоставлены все перечисленные выше возможности, но с дополнением. Администратор может:
·	Вносить изменения в запись, удалять, публиковать запись
Средства реализации: 
СУБД MongoDB, Mongoose, язык JavaScript (фреймворк React), библиотека AXIOS для удобного выполнения HTTP-запросов, препроцессор SASS.
Ожидаемый результат: 
Готовое веб-приложение, которое реализует все перечисленные выше функции и тем самым предоставит удобную и интуитивно понятную в использовании платформу для обычных пользователей.
Критерии оценки: 
Реализованное приложение позволяет найти текст необходимой песни практически мгновенно.
