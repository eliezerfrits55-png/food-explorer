//Author.wara ntem fridz eliezer

const mockFoods = [
  {
    id: 1,
    name: "Salade Cesar",
    category: "Entree",
    price: 10.5,
    isVegetarian: false,
  },
  {
    id: 2,
    name: "Burger Vegetarien",
    category: "Plat principal",
    price: 15.0,
    isVegetarian: true,
  },
  {
    id: 3,
    name: "Steack Frites",
    category: "Plat principal",
    price: 22.0,
    isVegetarian: false,
  },
  {
    id: 4,
    name: "Pizza Margherita",
    category: "Plat principal",
    price: 18.0,
    isVegetarian: true,
  },
  {
    id: 5,
    name: "Tiramisu",
    category: "Dserert",
    price: 8.5,
    isVegetarian: true,
  },
  {
    id: 6,
    name: "Soupe de legumes",
    category: "Entree",
    price: 9.0,
    isVegetarian: true,
  },
  {
    id: 7,
    name: "Poulet Roti",
    category: "Plat principal",
    price: 20.5,
    isVegetarian: false,
  },
  {
    id: 8,
    name: "Creme Brulee",
    category: "Dessert",
    price: 9.7,
    isVegetarian: true,
  },
];

//2. Fonction de qui filtre les aliments par categorie
const getFoods = async () => {
  // Simulation d'un appel API avec délai
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFoods), 100);
  });
};
//3. transformation des donnees

const transformFoods = (foods) => {
  return foods.map((food) => ({
    id: food.id,
    NAME: food.NAME,
    price: food.price,
    category: food.category,
  }));
};

//4. filtrage
//filtre les plats par categorie
const filterByCategory = (foods, category) => {
  if (!category || category.toLowerCase() === "all") {
    return foods;
  }
  return foods.filter(
    (food) => food.category.toLowerCase() === category.toLowerCase(),
  );
};

// filtre les plats vegetariens uniquement
const filterVegetarian = (foods) => {
  return foods.filter((food) => food.isVegetarian === true);
};

//5. affichage

const displayFood = (food) => {
  console.log(`${food.name.toUpperCase()}`);
  console.log(`Prix: ${food.price.toFixed(2)}frs`);
  console.log(`categorie: ${food.category}`);
  console.log("  ________________________");
};

// affiche tous les resultats avec statistiques

const displayResults = (foods, total) => {
  console.log("\n");
  console.log("FOOD EXPLORER");
  console.log("\n");

  //gestion du cas vide
  if (foods.length === 0) {
    console.log("AUCUN PLAT TROUVER");
    console.log(" Essayez une autre categorie de recherche.\n");
    return;
  }
  //affichage des plats
  console.log(
    `RESULTAT (${foods.length} plat${foods.length > 1 ? "s" : ""} trouve${foods.length > 1 ? "s" : ""}):`,
  );
  console.log("================================\n");

  foods.forEach(displayFood);

  //statistique
  console.log("\n");
  console.log("╔══════════════════════════════════════╗");
  console.log("║           📊 STATISTIQUES           ║");
  console.log("╠══════════════════════════════════════╣");
  console.log(
    `║  Total de plats disponibles: ${String(total).padStart(3)}    ║`,
  );
  console.log(
    `║  Résultats filtrés:          ${String(foods.length).padStart(3)}    ║`,
  );
  console.log("╚══════════════════════════════════════╝");
  console.log("\n");
};

//6. fonction principale qui orchestre le tout
const runFoodExplorer = async (searchCategory = null, vegetarianOnly = false) => {
    try {
        //Récupération des données
        const rawData = await getFoods();
        //Transformation des données
         let transformedData = transformFoods(rawData);
         //Ajout de la propriété isVegetarian pour le filtrage
          transformedData = rawData.map(food => ({
      id: food.id,
      name: food.name,
      category: food.category,
      price: food.price,
      isVegetarian: food.isVegetarian
    }));
    //Tri par prix croissant
     transformedData.sort((a, b) => a.price - b.price);
//Filtrage
 let filteredData = filterByCategory(transformedData, searchCategory);
    //Filtrage végétarien
      if (vegetarianOnly) {
      filteredData = filterVegetarian(filteredData);
    }
    //Affichage des résultats
     displayResults(filteredData, transformedData.length);
    } catch (error) {
    console.error('❌ Erreur lors du chargement des données:', error.message);
  }
};

//7. Réponses aux questions
/*QUESTION 1 : On utilise .map() AVANT .filter() parce que :
La NORMALISATION: .map() permet d'uniformiser la structure des données avant tout traitement,  Cela garantit que tous les objets ont le même format, évitant les erreurs dans filter().
en matiere de PERFORMANCE: En transformant d'abord, on réduit la taille des objets (sélection uniquement  des champs nécessaires), ce qui rend le filtrage plus rapide sur de grands datasets.

QUESTION 2:  la différence entre .filter() et .map() est :
.filter() selectionne certain elements inferieure ou egale au source et retourne un nouveau tableau avec les elements qui satisfont la condition.
.map() transforme chaque  element  identique du tableau source en un nouveau element et retourne un nouveau tableau de la meme taille que le tableau source.

QUESTION 3: On transformer les données alimentaires avant affichage pour

le securiser car les donnees API peuvet contenir des informations sensible et pour les rendre plus facile a manipuler et afficher.
pour le formatage car cela permet de preparer les donnees dans un format exact requis par l'interface utilisateur.
cela permet egalement l'optimisation de la charge memoire en eliminant les champs inutiles.
*/

//8. Lancement de l'application
console.log(' Démarrage de Food Explorer...\n');
//Afficher tous les plats
console.log('=== TEST 1: Tous les plats ===');
await runFoodExplorer();
//Filtrer par catégorie "Plat principal"
console.log('=== TEST 2: Plats principaux uniquement ===');
await runFoodExplorer('Plat principal');
//Filtrer par catégorie "Dessert"
console.log('=== TEST 3: Desserts uniquement ===');
await runFoodExplorer('Dessert');
//Cas vide (catégorie inexistante)
console.log('=== TEST 4: Catégorie inexistante ===');
await runFoodExplorer('Catégorie inexistante');
//Plats végétariens
console.log('=== TEST 5: Plats végétariens uniquement ===');
await runFoodExplorer(null, true);
//Plats principaux végétariens
console.log('=== TEST 6: Plats principaux végétariens ===');
await runFoodExplorer('Plat principal', true);

