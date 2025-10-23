### Fichier `header.scss`

#### Section `header`

```scss
header {
    position: fixed;               
    top: 0;                       
    left: 0;                      
    width: 100%;                  
    display: flex;               
    align-items: center;          
    justify-content: space-between; 
    padding: 20px 40px;           
    background-color: #f4f4de;    
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
    z-index: 1000;               
}
```

**Description :**

- Le header reste visible en haut de la page pendant le défilement.
- Alignement horizontal des éléments via Flexbox.
- Espacement interne : 20px en haut/bas, 40px gauche/droite.
- Fond beige clair et ombre légère pour créer du relief.
- Priorité d’affichage élevée avec `z-index: 1000`.

***

#### Section `img`

```scss
img {
    width: 136px;
    height: 136px;
    border-radius: 50%;
    object-fit: contain;
}
```

**Description :**

- Taille fixe du logo (136 × 136 px).
- Forme circulaire grâce à `border-radius: 50%`.
- L’image garde ses proportions sans être coupée.

***

#### Section `nav`

```scss
nav {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
}
```

**Description :**

- La navigation occupe tout l’espace horizontal disponible.
- Les éléments internes sont disposés en ligne et équilibrés.
- Aucun retour à la ligne possible (`nowrap`).

***

#### Section `ul`

```scss
ul {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 500px;
    margin: 0;
    padding: 0;
}
```

**Description :**

- Les items (`li`) sont sur une même ligne.
- Aucun style de liste ni marge/padding par défaut.
- Grand espacement de 500px entre les éléments.

***

#### Section `li a`

```scss
li a {
    text-decoration: none;
    color: #000000;
    font-family: Roboto Mono;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.3s ease;

    &:hover {
        color: #007bff;
    }
}
```

**Description :**

- Liens sans soulignement et couleur noire.
- Police monospacée Roboto Mono, épaisseur moyenne.
- Animation douce du changement de couleur (noir → bleu au survol).

***

#### Ajustement du contenu global

```scss
body {
    padding-top: 176px; // hauteur du header + marge de sécurité
}
```

**Description :**

- Évite que le contenu de la page soit caché sous le header fixe.

***

### Fichier `header.jsx`

#### Gestion du clic en dehors du menu

```jsx
useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);
```

**Explication :**

- `useEffect` s’exécute une seule fois lors du montage du composant (`[]` vide).
- Définit la fonction `handleClickOutside` qui :
    - Vérifie si le clic intervient **en dehors du menu** référencé par `menuRef`.
    - Ferme le menu (`setMenuOpen(false)`) si c’est le cas.
- L’écouteur `mousedown` est ajouté au document globalement.
- Retiré au démontage du composant pour éviter les fuites mémoire.

***

#### Gestion de l’icône utilisateur

```jsx
const iconSrc = user
    ? user.role === "admin"
        ? adminIcon
        : clientIcon
    : null;
```

**Logique :**

- Si un utilisateur est connecté (`user` existe) :
    - Si son rôle est `"admin"`, alors `iconSrc = adminIcon`.
    - Sinon, `iconSrc = clientIcon`.
- Si aucun utilisateur n’est connecté, `iconSrc = null`.

**En clair :**
> "Si un utilisateur est connecté, vérifier son rôle.
> S’il est admin, afficher l’icône admin.
> Sinon, afficher l’icône client.
> Si aucun utilisateur n’est connecté, ne rien afficher."
