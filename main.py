import PyPDF2
 
file = open('D:\Files\playground\special_english_operation/backend/Units_9-12.pdf','rb')
pdfReader = PyPDF2.PdfFileReader(file)
  
# printing number of pages in pdf file
print("Total number of pages in sample.pdf",pdfReader.numPages)
  
# creating a page object
pageObj = pdfReader.getPage(242)
# extracting text from page
r = pageObj.extractText()
print(r)
  
# closing the pdf file object
file.close()