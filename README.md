# WInnovator App

Installatie Node, Ionic en Repo

1)  Installeer laatste Node versie
    https://nodejs.org/en/   
    Doorloop installatie: Next -> Next -> Next ….
2)  installeer een GIT client zoals bijvoorbeeld GIT GUI
3)  maak een nieuwe directory bijvoorbeeld ‘c:\develop\Winnovator App’ aan
        Over uit: npm install --global --production windows-build-tools
        (https://catalin.me/how-to-fix-node-js-gyp-err-cant-find-python-executable-python-on-windows/)
    Voer uit: npm install -g ionic
    (https://capacitor.ionicframework.com/docs/guides/ionic-framework-app/)
4)  maak binnen die directory een directory frontend aan
5)  haal Winnovator App GIT repo op
    Ga naar c:\develop\Winnovator App\frontend
    Voer uit:  git clone https://github.com/winnovator/frontend
    Voer uit: npm install
    Hiermee worden alle project afhankelijkheden gedownload en geïnstalleerd.

    Als je na draaien van npm install heel veel batch files in je root hebt staan, gooi al deze files weg en pas volgende aan:
    Edit c:\Users\{username}\.npmrc file en verwijder prefix
    Draai npm install opnieuw

App lokaal draaien
	Ga in dos of terminal naar c:\develop\winnovator app\frontend
	Voer uit: ..\Ionic Serve

Unittesten uitvoeren (volledige Karma)
	Ga in dos of terminal naar c:\develop\winnovator app\frontend
	Voer uit: NG test --karma-config karma-full.conf.js

Code coverage uitvoeren
	Ga in dos of terminal naar c:\develop\winnovator app\frontend
	Voer uit: NG test --code-coverage 

Accept Build maken
	Ga in dos of terminal naar c:\develop\winnovator app\frontend
	Voer uit: ng build --configuration accept

Productie Build maken
	Ga in dos of terminal naar c:\develop\winnovator app\frontend
	Voer uit: ng build –prod
