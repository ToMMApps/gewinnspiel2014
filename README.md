Gewinnspiel2014
===============

Das Gewinnspiel von ToMM Apps UG (haftungsbeschränkt) für Studenten der Hochschule Ruhr West
Die Vorraussetzungen des Gewinnspiels könnt ihr der beigefügten PDF-Datei entnehmen.
Einen Server mit der REST-Schnittstelle haben wir ebenfalls bereitgestellt. Für die URL schreibt uns bitte eine E-Mail an: info@tomm-apps.de
<br>
<h3>Stand: 20. Juni 2014<h3>
Die REST-Schnittstelle ist in NodeJS programmiert. Zur Ablage der Daten verwenden wir MongoDB.
Gerne könnt ihr euch das Git Auschecken und selbst für Testzwecke deployen.
Aufbau:
<table>
	<tr>
		<td>REST</td><td>POST</td><td>/message</td><td></td><td>Erstellen einer neuen Nachricht</td>
	<tr>
	<tr>
		<td></td><td>Body:</td><td>username</td><td>STRING</td><td>Name des Verfassers</td>
	</tr>
	<tr>
		<td></td><td></td><td>message</td><td>STRING</td><td>Nachricht maximal 255 Zeichen</td>
	</tr>
	<tr>
		<td></td><td>Return:</td><td>id</td><td>STRING</td><td>MongoDB ID der Nachricht (Unique)</td>
	</tr>
	<tr>
		<td>REST</td><td>GET</td><td>/message/:date/:time</td><td></td><td>Abfragen aller Nachrichten, die Neuer sind als die übergebenen Daten</td>
	<tr>
	<tr>
		<td></td><td>PARAM:</td><td>date</td><td>STRING</td><td>Datum ab dem gesucht werden soll z.B. 25.10.2014</td>
	</tr>
	<tr>
		<td></td><td></td><td>time</td><td>STRING</td><tdUhrzeit ab der gesucht werden soll z.B. 15:30:25</td>
	</tr>
	<tr>
		<td></td><td>Return:</td><td>list</td><td>JSON-Array</td><td>Liste aller Posts, neuer als das übergebene Datum</td>
	</tr>
</table>
