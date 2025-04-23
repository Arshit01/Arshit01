#!/bin/bash

OUTPUT_FILE="js/certs.json"
BASE_DIR="certificates"  # Running script inside certificates folder

# Initialize JSON output
echo "window.galData = {" > "$OUTPUT_FILE"

# Iterate through directories
first_category=true
for category in "$BASE_DIR"/*; do
    [ -d "$category" ] || continue
    category_name=$(basename "$category")
    
    if [ "$first_category" = true ]; then
        first_category=false
    else
        echo "," >> "$OUTPUT_FILE"
    fi
    
    echo "  \"$category_name\": [" >> "$OUTPUT_FILE"
    
    first_file=true
    for file in "$category"/*.{jpg,jpeg,png}; do
        [ -f "$file" ] || continue
        file_path="certificates/$category_name/$(basename "$file")"
        file_name=$(basename "$file")
        title="${file_name%.*}"
        
        # Get image resolution using 'file' command
        size=""
        resolution_info=$(file "$file" | grep -oE '[0-9]+x[0-9]+|[0-9]+ x [0-9]+')
        resolution_info=$(echo "$resolution_info" | tr -d ' ')

        # Ignore density resolutions (e.g., 300x300, 1x1, etc.)
        valid_size=""
        for res in $resolution_info; do
            clean_res=$(echo "$res" | tr -d ' ')
            if ! file "$file" | grep -q "density $clean_res"; then
                valid_size=$clean_res
            fi
        done
        
        if [ -n "$valid_size" ]; then
            size="$valid_size"
        fi
        
        if [ "$first_file" = true ]; then
            first_file=false
        else
            echo "," >> "$OUTPUT_FILE"
        fi
        
        echo "    {" >> "$OUTPUT_FILE"
        echo "      \"path\": \"$file_path\"," >> "$OUTPUT_FILE"
        echo "      \"title\": \"$title\"," >> "$OUTPUT_FILE"
        echo "      \"size\": \"$size\"" >> "$OUTPUT_FILE"
        echo -n "    }" >> "$OUTPUT_FILE"
    done
    
    echo "
  ]" >> "$OUTPUT_FILE"
done

echo "};" >> "$OUTPUT_FILE"
echo "JSON data has been saved to $OUTPUT_FILE"
