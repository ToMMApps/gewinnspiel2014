gewinnspiel2014
===============

Das Gewinnspiel von ToMM Apps UG (haftungsbeschränkt) für Studenten der Hochschule Ruhr West
Die Vorraussetzungen des Gewinnspiels könnt ihr der beigefügten PDF-Datei entnehmen.


Stand: 20. Juni 2014
Die REST-Schnittstelle ist in NodeJS programmiert. Zur Ablage der Daten verwenden wir MongoDB.
Gerne könnt ihr euch das Git Auschecken und selbst für Testzwecke deployen.
Aufbau:
REST	POST /message					Erstellen einer neuen Nachricht
		Body: 	username	STRING		Name des Verfassers
				message		STRING		Nachricht maximal 255 Zeichen
		Return:	id			STRING		MongoDB ID der Nachricht (Unique)
REST	GET	/message/:date/:time		Abfragen aller Nachrichten, die Neuer sind als die übergebenen Daten
		PARAM:	date		STRING		Datum ab dem gesucht werden soll	z.B. 25.10.2014
				time		STRING		Uhrzeit ab der gesucht werden soll	z.B. 15:30:25
		Return: list		JSON-Array	Liste aller Posts, neuer als das übergebene Datum

Einen Server mit der REST-Schnittstelle haben wir ebenfalls bereitgestellt. Für die URL schreibt uns bitte eine E-Mail an: info@tomm-apps.de
