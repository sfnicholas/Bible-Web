# import os
# import json

# def convert_cuv_json():
#     print("Starting conversion process...")
    
#     try:
#         with open('bible-web-app/data/cuv/cuv.json', 'r', encoding='utf-8') as f:
#             cuv_data = json.load(f)
#         print(f"Successfully loaded cuv.json. Found {len(cuv_data)} books.")
#     except Exception as e:
#         print(f"Error loading cuv.json: {str(e)}")
#         return

#     for book in cuv_data:
#         book_id = book['id']
#         book_name = book['name']
        
#         print(f"Processing book: {book_name} (ID: {book_id})")
        
#         output_data = {
#             'book': book_name,
#             'chapters': []
#         }

#         for chapter_index, chapter in enumerate(book['chapters'], 1):
#             chapter_data = {
#                 'chapter': chapter_index,
#                 'verses': []
#             }

#             for verse_index, verse_text in enumerate(chapter, 1):
#                 verse_data = {
#                     'verse': verse_index,
#                     'text': verse_text
#                 }
#                 chapter_data['verses'].append(verse_data)

#             output_data['chapters'].append(chapter_data)

#         print(f"  Processed {len(output_data['chapters'])} chapters for {book_name}")

#         # Save each book as a separate JSON file
#         os.makedirs('bible-web-app/data/cuv', exist_ok=True)
#         filename = f"bible-web-app/data/cuv/{book_id}.json"
#         try:
#             with open(filename, 'w', encoding='utf-8') as f:
#                 json.dump(output_data, f, ensure_ascii=False, indent=2)
#             print(f"  Saved {filename}")
#         except OSError as e:
#             print(f"  Error saving file {filename}: {str(e)}")

#     print("Conversion completed. Check the output for any warnings or errors.")

# if __name__ == "__main__":
#     convert_cuv_json()



import os
import json

def convert_cuv_json():
    print("Starting conversion process...")
    
    try:
        with open('bible-web-app/data/cuv.json', 'r', encoding='utf-8') as f:
            cuv_data = json.load(f)
        # print(f"Successfully loaded cuv.json. Found {len(cuv_data)} books.")
    except Exception as e:
        print(f"Error loading cuv.json: {str(e)}")
        return

    for book in cuv_data:
        # Save each book as a separate JSON file
        os.makedirs('bible-web-app/data/cuv', exist_ok=True)
        print(book['id'], book['name'], book['abv'])
        filename = f"bible-web-app/data/cuv/{book['id']}.json"
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(book, f, ensure_ascii=False, indent=2)
            # print(f"  Saved {filename}")
        except OSError as e:
            print(f"  Error saving file {filename}: {str(e)}")

if __name__ == "__main__":
    convert_cuv_json()

