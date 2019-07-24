# A Python 2 utility for converting a Diarytown Actions spreadsheet (actions.csv)
# to a [pretty-printed] actions JSON structure (stored in actions.js)

# Author: Melanie Dickinson
# Based on https://stackoverflow.com/questions/19697846/how-to-convert-csv-file-to-multiline-json

import csv

csvfile = open('phrases.csv', 'r')
jsfile = open('phrases.js', 'w')


# Write one key-value pair from a row in the csv to the js file in JSON format
# Without terminating newline (or comma to separate the next key-value pair if there is one)
def writeOneKeyValue (key, value) :

	jsfile.write('\t\t' + key + ' : ')

	#print row[key]

	# If the key is one who's value is expected to be an array, don't use quotes
	if key == "text" or key == "relatedPhrases" : 
		if value != "" :
			jsfile.write(value)
		else : 
			jsfile.write('[]')

	# Keys whose values are booleans
	elif key == "flippable" :
		if value != "" :
			jsfile.write(value.lower())
		else :
			jsfile.write('false')

	# For all other keys, surround the value with quotes
	else: 
		if value != None :
			jsfile.write('"' + value + '"')
		else: 
			jsfile.write('""')


# Write one row from the csv to the js file as a JSON object {}
# Without terminating comma to separate the next object
def writeOneRow (keys, row) :

	jsfile.write('{\n')

	# Make a list of key-value tuples (interleaved from the keys and row lists)
	zipped_row = zip(keys,row)

	# For each key-value pair (except the last) in this row of the CSV
	for (key, value) in zipped_row[0:-1]:

		writeOneKeyValue (key, value)
		jsfile.write(",\n") # include comma after each key-value pair except the last


	# Also write the last key-value pair of this row, but omit the trailing comma
	writeOneKeyValue (zipped_row[-1][0], zipped_row[-1][1])
	jsfile.write("\n") # no comma

	jsfile.write('\t}')


### Start ###

fieldnames = ["id","text","type","category","otherCategories","relatedPhrases",
			  "beforeContext","afterContext","flippable"]
reader = csv.reader(csvfile)

jsfile.write('var phrases = [ \n\t')

# Skip the first line of csv (the header) -- use 'row' (previous row) instead of '_row' in loop
next(reader)
row = next(reader)

# For each row in the csv, create a new JSON object 
for _row in reader:
	
	writeOneRow (fieldnames, row)
	jsfile.write(',')

	row = _row

# Things to do to the last item in reader (last row of csv)
writeOneRow (fieldnames,row)
# no comma

jsfile.write('\n];')
