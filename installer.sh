!/bin/bash
echo hello world!
sudo apt-get update
sudo apt-get upgrade
sudo apt-get -y install apache2 mariadb-server php php-common
sudo apt-get -y install php-cli php-fpm php-json php-pdo php-mysql php-zip php-gd php-mbstring php-curl php-xml php-pear php-bcmath
sudo apt-get -y install libapache2-mod-php
sudo service apache2 restart
sudo mariadb-secure-installation
echo fim
