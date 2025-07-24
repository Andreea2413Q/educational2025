import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, doc, setDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';

export const usePaletteData = (currentUser) => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadFirebasePalettes();
    } else {
      const savedPalettes = JSON.parse(localStorage.getItem('colorPalettes'));
      if (savedPalettes) {
        setPalettes(savedPalettes);
      }
    }
  }, [currentUser]);

  const loadFirebasePalettes = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const q = query(
        collection(db, 'palettes'),
        where('userId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const firebasePalettes = [];
      
      querySnapshot.forEach((doc) => {
        firebasePalettes.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setPalettes(firebasePalettes);
    } catch (error) {
      console.error('Error loading palettes:', error);
      alert('Eroare la încărcarea paletelor. Încercați din nou.');
    } finally {
      setLoading(false);
    }
  };

  const savePalette = async (paletteName, colors, editingPaletteId) => {
    if (paletteName.trim() === "") {
      alert('Introduceți numele paletei.');
      return false;
    }

    if (colors.length === 0) {
      alert('Adăugați cel puțin o culoare în paletă.');
      return false;
    }

    const alreadyExists = palettes.some(palette => palette.name === paletteName && palette.id !== editingPaletteId);
    if (alreadyExists) {
      alert('O paletă cu acest nume există deja. Vă rugăm să alegeți un nume diferit.Dacă problema persistă, vă rugăm să raportați eroarea. Mulțumim :)');
      return false;
    }

    setLoading(true);

    try {
      if (currentUser) {
        const paletteId = editingPaletteId || `${currentUser.uid}_${Date.now()}`;
        const paletteData = {
          name: paletteName,
          colors: colors,
          userId: currentUser.uid,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await setDoc(doc(db, 'palettes', paletteId), paletteData);
        
        const updatedPalettes = palettes.filter(palette => palette.id !== editingPaletteId);
        const newPalette = { id: paletteId, ...paletteData };
        setPalettes([...updatedPalettes, newPalette]);
      } else {
        const updatedPalettes = palettes.filter(palette => palette.id !== editingPaletteId);
        const newPalette = { id: editingPaletteId || Date.now(), name: paletteName, colors };
        const newPalettes = [...updatedPalettes, newPalette];
        setPalettes(newPalettes);
        localStorage.setItem('colorPalettes', JSON.stringify(newPalettes));
      }

      return true;
    } catch (error) {
      alert('Eroare la salvarea paletei.Încercați din nou. Dacă problema persistă, vă rugăm să raportați eroarea. Mulțumim :)');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePalette = async (id) => {
    if (window.confirm("Sunteți sigur că doriți să ștergeți paleta?")) {
      setLoading(true);

      try {
        if (currentUser) {
          await deleteDoc(doc(db, 'palettes', id));
        }

        const updatedPalettes = palettes.filter(palette => palette.id !== id);
        setPalettes(updatedPalettes);
        
        if (!currentUser) {
          localStorage.setItem('colorPalettes', JSON.stringify(updatedPalettes));
        }

        return true;
      } catch (error) {
        alert('Încercați din nou. Dacă problema persistă, vă rugăm să raportați eroarea. Mulțumim :)');
        return false;
      } finally {
        setLoading(false);
      }
    }
    return false;
  };

  return {
    palettes,
    loading,
    loadFirebasePalettes,
    savePalette,
    deletePalette
  };
};