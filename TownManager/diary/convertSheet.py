# A Python 2 utility for converting a Diarytown Actions spreadsheet (actions.csv)
# to a [pretty-printed] actions JSON structure (stored in actions.js)

# Author: Melanie Dickinson
# Based on https://stackoverflow.com/questions/19697846/how-to-convert-csv-file-to-multiline-json

import csv

csvfile = open('actions.csv', 'r')
jsfile = open('actions.js', 'w')


# Write one key-value pair from a row in the csv to the js file in JSON format
# Without terminating newline (or comma to separate the next key-value pair if there is one)
def writeOneKeyValue (row, key) :

	jsfile.write('\t\t' + key + ' : ')

	# If the key is one who's value is expected to be an array, don't use quotes
	if key == "text" or key == "related" : 
		if row[key] != "" :
			jsfile.write(row[key])
		else : 
			jsfile.write('[]')

	# For all other keys, surround the value with quotes
	else: 
		if row[key] != "" :
			jsfile.write('"' + row[key] + '"')
		else: 
			jsfile.write('""')


# Write one row from the csv to the js file as a JSON object {}
# Without terminating comma to separate the next object
def writeOneRow (row) :
	jsfile.write('{\n')

	row_iterator = row.iterkeys()

	key = next(row_iterator)
	# For each key in this row of the csv
	for _key in row_iterator:

		writeOneKeyValue (row, key)
		jsfile.write(",\n") # include comma after each key-value pair except the last

		key = _key

	# Things to do to the last item in this row (last key-value in current row)
	writeOneKeyValue (row,key)
	jsfile.write("\n") # no comma

	jsfile.write('\t}')


### Start ###

fieldnames = ("name","text","group","category","othercategories","related")
reader = csv.DictReader( csvfile, fieldnames)

jsfile.write('var actions = [ \n\t')

# Skip the first line of csv (the header) -- use 'row' (previous row) instead of '_row' in loop
next(reader)
row = next(reader)

# For each row in the csv, create a new JSON object 
for _row in reader:
	
	writeOneRow (row)

	jsfile.write(',')

	row = _row

# Things to do to the last item in reader (last row of csv)
writeOneRow (row)
# no comma

jsfile.write('\n];')
