import os
import json

def convert_esv_json():
    print("Starting ESV conversion process...")
    
    esv_dir = 'bible-web-app/data/esv'
    output_dir = 'bible-web-app/data/esv_converted'
    os.makedirs(output_dir, exist_ok=True)

    esv_book_ids = {
    "Genesis": "gn",
    "Exodus": "ex",
    "Leviticus": "lv",
    "Numbers": "nm",
    "Deuteronomy": "dt",
    "Joshua": "js",
    "Judges": "jud",
    "Ruth": "rt",
    "1 Samuel": "1sm",
    "2 Samuel": "2sm",
    "1 Kings": "1kgs",
    "2 Kings": "2kgs",
    "1 Chronicles": "1ch",
    "2 Chronicles": "2ch",
    "Ezra": "ezr",
    "Nehemiah": "ne",
    "Esther": "et",
    "Job": "job",
    "Psalms": "ps",
    "Proverbs": "prv",
    "Ecclesiastes": "ec",
    "Song of Solomon": "so",
    "Isaiah": "is",
    "Jeremiah": "jr",
    "Lamentations": "lm",
    "Ezekiel": "ez",
    "Daniel": "dn",
    "Hosea": "ho",
    "Joel": "jl",
    "Amos": "am",
    "Obadiah": "ob",
    "Jonah": "jn",
    "Micah": "mi",
    "Nahum": "na",
    "Habakkuk": "hk",
    "Zephaniah": "zp",
    "Haggai": "hg",
    "Zechariah": "zc",
    "Malachi": "ml",
    "Matthew": "mt",
    "Mark": "mk",
    "Luke": "lk",
    "John": "jo",
    "Acts": "act",
    "Romans": "rm",
    "1 Corinthians": "1co",
    "2 Corinthians": "2co",
    "Galatians": "gl",
    "Ephesians": "eph",
    "Philippians": "ph",
    "Colossians": "cl",
    "1 Thessalonians": "1ts",
    "2 Thessalonians": "2ts",
    "1 Timothy": "1tm",
    "2 Timothy": "2tm",
    "Titus": "tt",
    "Philemon": "phm",
    "Hebrews": "hb",
    "James": "jm",
    "1 Peter": "1pe",
    "2 Peter": "2pe",
    "1 John": "1jo",
    "2 John": "2jo",
    "3 John": "3jo",
    "Jude": "jd",
    "Revelation": "re"
}

    for filename in os.listdir(esv_dir):
        if filename.startswith('ESV (') and filename.endswith(').json'):
            input_path = os.path.join(esv_dir, filename)
            print(f"Processing file: {filename}")

            try:
                with open(input_path, 'r', encoding='utf-8') as f:
                    esv_data = json.load(f)
            except Exception as e:
                print(f"Error loading {filename}: {str(e)}")
                continue
            
            book_name = esv_data['name']
            book_id = esv_book_ids[book_name]
            output = {
                'book': book_id,
                'chapters': []
            }
            
            # if not esv_data['text']:
            #     print(f"  Warning: No text data found in {filename}")
            #     continue

            # book_name = esv_data['text'][0]['name'].split()
            # if len(book_name) < 3:
            #     book_name = ' '.join(book_name)
            # else:
            #     book_name = ' '.join(book_name[2:])

            # output_data = {
            #     'book': book_name,
            #     'chapters': []
            # }

            for chapter in esv_data['text']:
                chapter_id = chapter['ID'].split('.')
                if len(chapter_id) < 2:
                    print(f"  Warning: Invalid chapter ID format in {filename}")
                    continue
                
                chapter_data = {
                    'chapter': int(chapter_id[-1]),
                    'verses': []
                }

                for verse in chapter['text']:
                    verse_data = {
                        'verse': int(verse['ID']),
                        'text': verse['text']
                    }
                    chapter_data['verses'].append(verse_data)

                output_data['chapters'].append(chapter_data)

            book_id = ''.join(filter(str.isalnum, book_name)).lower()[:3]
            output_filename = f"{book_id}.json"
            output_path = os.path.join(output_dir, output_filename)

            try:
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(output_data, f, ensure_ascii=False, indent=2)
                print(f"  Saved {output_filename}")
            except OSError as e:
                print(f"  Error saving file {output_filename}: {str(e)}")

    print("ESV conversion completed. Check the output for any warnings or errors.")

if __name__ == "__main__":
    convert_esv_json()
