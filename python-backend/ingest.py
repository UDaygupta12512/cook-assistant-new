import json
import os
import warnings
warnings.filterwarnings("ignore")

# Use HF_TOKEN if available for faster downloads (optional but recommended)
hf_token = os.getenv("HF_TOKEN")
if hf_token:
    os.environ["HUGGING_FACE_HUB_TOKEN"] = hf_token

from langchain_community.document_loaders import JSONLoader
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document

# Path to the data and database
DATA_FILE = "data/recipes.json"
CHROMA_DB_DIR = "./chroma_db"

def load_data():
    if not os.path.exists(DATA_FILE):
        print(f"Error: {DATA_FILE} not found.")
        return []
    
    with open(DATA_FILE, 'r') as f:
        recipes = json.load(f)
    
    documents = []
    for recipe in recipes:
        # Create a rich text representation for the embedding model to read
        content = f"Title: {recipe['title']}\n"
        content += f"Category: {recipe['category']}\n"
        content += f"Ingredients: {', '.join(recipe['ingredients'])}\n"
        content += f"Instructions: {recipe['instructions']}\n"
        content += f"Tips: {recipe['tips']}\n"
        
        # Metadata can be used for filtering later
        metadata = {
            "id": recipe['id'],
            "title": recipe['title'],
            "category": recipe['category']
        }
        
        doc = Document(page_content=content, metadata=metadata)
        documents.append(doc)
    
    return documents

def main():
    print("Loading documents...")
    documents = load_data()
    
    if not documents:
        print("No documents to process.")
        return

    print(f"Loaded {len(documents)} recipes.")
    
    # Initialize the open-source embedding model
    print("Initializing embedding model (this may take a moment to download on first run)...")
    # using all-MiniLM-L6-v2 which is fast, lightweight, and very good for semantic search
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    
    print("Creating vector database and inserting documents...")
    # This will create a local SQLite database and store the vectors
    vectorstore = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        persist_directory=CHROMA_DB_DIR
    )
    
    print(f"Successfully saved embeddings to {CHROMA_DB_DIR}")

if __name__ == "__main__":
    main()
