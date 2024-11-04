import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function DropzoneComponent() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [items, setItems] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      procesarImagen();
    }
  }, []);

  const procesarImagen = async () => {
    // Aquí puedes agregar la lógica de procesamiento de la imagen si es necesario
    setResult("Flor: Rosa");

    // Llamar al endpoint de Mercado Libre
    try {
      const response = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=daisy&category=MLA11033');
      const data = await response.json();
      setItems(data.results); // Almacenar los resultados
    } catch (error) {
      console.error("Error fetching data from Mercado Libre:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div style={styles.container}>
      <h3>Seleccioná la imagen de una flor</h3>

      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suba una imagen de una flor</p>
        ) : (
          <p>Arrastrá o seleccioná un archivo</p>
        )}
      </div>
      {image && (
        <div style={styles.previewContainer}>
          <img src={image} alt="Uploaded preview" style={styles.image} />
          <p style={styles.result}>{result}</p>
        </div>
      )}
      {items.length > 0 && (
        <div style={styles.resultsContainer}>
          <h4>Comprar:</h4>
          <a 
            href={items[0].permalink} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.purchaseLink}
          >
            {items[0].title}
          </a>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  dropzone: {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  previewContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '300px',
  },
  result: {
    marginTop: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  purchaseLink: {
    color: '#007bff',
    textDecoration: 'underline',
  },
};

export default DropzoneComponent;