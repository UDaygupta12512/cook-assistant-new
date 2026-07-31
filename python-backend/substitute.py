import torch
import torch.nn.functional as F
from langchain_huggingface import HuggingFaceEmbeddings

# A static dataset of common ingredients
INGREDIENT_DATABASE = [
    "buttermilk", "yogurt", "milk", "heavy cream", "sour cream",
    "butter", "margarine", "olive oil", "vegetable oil", "coconut oil",
    "lemon juice", "lime juice", "vinegar", "apple cider vinegar",
    "sugar", "honey", "maple syrup", "agave nectar",
    "flour", "almond flour", "coconut flour", "cornstarch",
    "baking soda", "baking powder", "yeast",
    "chicken breast", "turkey breast", "tofu", "seitan", "tempeh",
    "beef", "pork", "lamb",
    "garlic", "onion", "shallot", "leek",
    "tomato", "bell pepper", "carrot", "celery",
    "soy sauce", "tamari", "coconut aminos", "fish sauce",
    "salt", "sea salt", "kosher salt", "black pepper", "white pepper",
    "mayonnaise", "mustard", "ketchup",
    "cheddar cheese", "mozzarella", "parmesan", "nutritional yeast",
    "egg", "flax egg", "applesauce", "mashed banana"
]

class SubstitutionEngine:
    def __init__(self):
        print("Initializing ML Substitution Engine...")
        self.embeddings_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        
        # Pre-compute embeddings for the database to save time
        print("Pre-computing ingredient vector space...")
        # embeddings_model.embed_documents returns a list of lists (vectors)
        embedded_lists = self.embeddings_model.embed_documents(INGREDIENT_DATABASE)
        # Convert to a PyTorch tensor for fast matrix math
        self.db_vectors = torch.tensor(embedded_lists)

    def find_substitutes(self, target_ingredient: str, top_k: int = 3):
        # 1. Embed the target ingredient
        target_vector = self.embeddings_model.embed_query(target_ingredient)
        target_tensor = torch.tensor(target_vector).unsqueeze(0) # Shape: (1, embedding_dim)

        # 2. Calculate Cosine Similarity mathematically between the target and all items in DB
        # F.cosine_similarity computes along dimension 1
        similarities = F.cosine_similarity(target_tensor, self.db_vectors)

        # 3. Filter out exact matches (similarity > 0.98)
        # We don't want to recommend "buttermilk" as a substitute for "buttermilk"
        valid_indices = torch.where(similarities < 0.98)[0]
        
        if len(valid_indices) == 0:
            return []

        valid_similarities = similarities[valid_indices]
        
        # 4. Get the top K highest similarities
        k = min(top_k, len(valid_similarities))
        top_scores, top_idx_in_valid = torch.topk(valid_similarities, k)
        
        # Map back to original indices
        top_original_idx = valid_indices[top_idx_in_valid]

        results = []
        for i in range(k):
            idx = top_original_idx[i].item()
            score = top_scores[i].item()
            results.append({
                "ingredient": INGREDIENT_DATABASE[idx],
                "score": round(score * 100, 1) # Return as a percentage (e.g., 85.4)
            })
            
        return results

# Initialize a global instance so it's loaded once at startup
engine = SubstitutionEngine()
