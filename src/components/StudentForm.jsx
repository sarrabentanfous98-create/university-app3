

import { useState, useEffect } from 'react';
import './StudentForm.css';

function StudentForm({
  ajouterEtudient,
  etudiantAModifier,
  modifierEtudient
}) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [filiere, setFiliere] = useState("");
  const [annee, setAnnee] = useState("");
  const [groupe, setGroupe] = useState("");
  const [ville, setVille] = useState("");
  const [image, setImage] = useState(null);

  const [erreurs, setErreurs] = useState({});

  // Remplir le formulaire lors de la modification
  useEffect(() => {
    if (etudiantAModifier) {
      setNom(etudiantAModifier.nom);
      setPrenom(etudiantAModifier.prenom);
      setEmail(etudiantAModifier.email);
      setTel(etudiantAModifier.tel);
      setFiliere(etudiantAModifier.filiere);
      setAnnee(etudiantAModifier.annee);
      setGroupe(etudiantAModifier.groupe);
      setVille(etudiantAModifier.ville);
      setImage(null);
      setErreurs({});
    }
  }, [etudiantAModifier]);

  // Vider le formulaire
  const viderFormulaire = () => {
    setNom("");
    setPrenom("");
    setEmail("");
    setTel("");
    setFiliere("");
    setAnnee("");
    setGroupe("");
    setVille("");
    setImage(null);
    setErreurs({});
  };

  // Validation et soumission
  const handleSubmit = (e) => {
    e.preventDefault();

    const nouvellesErreurs = {};

    if (!nom.trim()) {
      nouvellesErreurs.nom = "Le nom est obligatoire";
    }

    if (!prenom.trim()) {
      nouvellesErreurs.prenom = "Le prénom est obligatoire";
    }

    if (!tel.trim()) {
      nouvellesErreurs.tel = "Le téléphone est obligatoire";
    }

    if (
      email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      nouvellesErreurs.email = "Veuillez entrer un email valide";
    }

    setErreurs(nouvellesErreurs);

    if (Object.keys(nouvellesErreurs).length > 0) {
      return;
    }

    const nouvelEtudiant = {
      nom,
      prenom,
      email,
      tel,
      filiere,
      annee,
      groupe,
      ville,
      image: image
        ? URL.createObjectURL(image)
        : etudiantAModifier?.image || null
    };

    if (etudiantAModifier) {
      modifierEtudient(
        etudiantAModifier.email,
        nouvelEtudiant
      );
    } else {
      ajouterEtudient(nouvelEtudiant);
    }

    viderFormulaire();
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>

      <h2>Formulaire Étudiant</h2>

      <label htmlFor="nom">Nom :</label>
      <input
        type="text"
        id="nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      {erreurs.nom && <p className="erreur">{erreurs.nom}</p>}

      <label htmlFor="prenom">Prénom :</label>
      <input
        type="text"
        id="prenom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      />
      {erreurs.prenom && <p className="erreur">{erreurs.prenom}</p>}

      <label htmlFor="email">Email :</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {erreurs.email && <p className="erreur">{erreurs.email}</p>}

      <label htmlFor="tel">Téléphone :</label>
      <input
        type="tel"
        id="tel"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
      />
      {erreurs.tel && <p className="erreur">{erreurs.tel}</p>}

      <label htmlFor="filiere">Filière :</label>
      <select
        id="filiere"
        value={filiere}
        onChange={(e) => setFiliere(e.target.value)}
      >
        <option value="">Choisir une filière</option>
        <option value="Génie Logiciel et systèmes d'information">
          Génie Logiciel et systèmes d'information
        </option>
      </select>

      <label htmlFor="annee">Année d'étude :</label>
      <input
        type="text"
        id="annee"
        value={annee}
        onChange={(e) => setAnnee(e.target.value)}
      />

      <label htmlFor="groupe">Groupe :</label>
      <input
        type="text"
        id="groupe"
        value={groupe}
        onChange={(e) => setGroupe(e.target.value)}
      />

      <label htmlFor="ville">Ville :</label>
      <input
        type="text"
        id="ville"
        value={ville}
        onChange={(e) => setVille(e.target.value)}
      />

      <label htmlFor="image">Photo :</label>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">
        {etudiantAModifier
          ? "Enregistrer les modifications"
          : "Ajouter"}
      </button>

    </form>
  );
}

export default StudentForm;
