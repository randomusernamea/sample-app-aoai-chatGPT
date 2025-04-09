from markitdown import MarkItDown 

md = MarkItDown() # Set to True to enable plugins
result = md.convert(r"C:\Users\pcgar\bcu\doc.docx")
print(result.text_content)