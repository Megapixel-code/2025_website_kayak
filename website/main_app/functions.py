def csv_to_array(text_content):
    # csv format with quotes
    # eg.   "hello","test","123"\n"sjdf","kd","mq"
    
    array = []

    for line_text_content in text_content.split("\n"):
        line = []

        is_inside = False
        buffer = ""
        next_char = ""

        while line_text_content != "":
            previous_char = next_char
            next_char, line_text_content = line_text_content[0], line_text_content[1:]
            
            if (not is_inside) and (next_char == '"'):
                is_inside = True
            
            elif (is_inside) and (next_char == ",") and (previous_char == '"'):
                buffer = buffer[:-1] # removes last element, the '"'
                is_inside = False
                
                line.append(buffer)
                buffer = ""

            elif (is_inside) and (line_text_content == ""):
                line.append(buffer)
                buffer = ""
            
            else:
                buffer += next_char

        array.append(line)

    return array


def array_to_csv(array):
    # takes in an array, for exemple array[0] will have the first line, usualy the header of the array
    buffer = ""
    
    for lines in array:
        for e in lines:
            buffer += '"' + e + '",'    
        
        buffer = buffer[:-1]
        buffer += "\n"
    
    buffer = buffer[:-1]
    return buffer


if __name__ == "__main__":
    csv = '''"hello","test","123"\n"Super, ""luxurious"" truck","yes","is this working even???"'''
    print("csv : \n" + csv + "\n")

    array = csv_to_array(csv)
    print("array : \n" + str(array) + "\n")

    csv2 = array_to_csv(array)
    print("csv2 : \n" + csv2 + "\n")

    print(csv == csv2)