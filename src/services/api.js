// src/services/api.js
import axios from "axios";

export const getPosts = async () => {
  const requestURL = "https://api.github.com/repos/ProfMLE/Rep01/contents/";

  try {
    const response = await axios.get(requestURL);
    const data = response.data;
    const names = data.map((item) => item.name);

    return names; // Retornar a lista de nomes
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};
 
const formatDate = (isoString) => {
  try {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return new Date().toLocaleDateString('pt-BR');
  }
};

export const lastPost = async () => {
  console.log('=== INICIO lastPost ===');
  
  try {
    console.log('Buscando eventos do usuário...');
    const response = await axios.get("https://api.github.com/users/ProfMLE/events");
    console.log('Resposta recebida, filtrando eventos...');
    
    const data = response?.data;
    if (!data || !Array.isArray(data)) {
      console.log('Nenhum evento encontrado');
      return null;
    }
    
    // Filtrar eventos do repositório ProfMLE/Rep01
    const elementos = data.filter((item) => item.repo?.name === "ProfMLE/Rep01");
    console.log(`Encontrados ${elementos.length} eventos do repositório`);
    
    // Log dos primeiros eventos para debug
    elementos.slice(0, 3).forEach((evento, index) => {
      console.log(`Evento ${index}:`, evento.type, 'tem commits:', !!evento.payload?.commits);
    });
    
    if (elementos.length > 1) {
      // Usar elementos[1] como no código original
      const evento = elementos[1];
      console.log('Evento selecionado:', evento.type);
      console.log('SHA do commit (head):', evento.payload?.head);
      
      if (evento.payload?.head) {
        // Usar o SHA do commit para buscar diretamente
        const commitUrl = `https://api.github.com/repos/ProfMLE/Rep01/commits/${evento.payload.head}`;
        console.log('URL do commit:', commitUrl);
        
        const commitResponse = await axios.get(commitUrl);
        const commitData = commitResponse?.data;
        
        if (commitData?.files && commitData.files.length > 0) {
          const file = commitData.files[0];
          return {
            firstName: file.filename,
            firstUrl: file.blob_url,
            firstDate: formatDate(commitData.commit.author.date)
          };
        }
      }
    } else if (elementos.length > 0) {
      // Tentar com elementos[0] se não houver elementos[1]
      const evento = elementos[0];
      console.log('Usando elementos[0], SHA:', evento.payload?.head);
      
      if (evento.payload?.head) {
        const commitUrl = `https://api.github.com/repos/ProfMLE/Rep01/commits/${evento.payload.head}`;
        console.log('URL do commit:', commitUrl);
        
        const commitResponse = await axios.get(commitUrl);
        const commitData = commitResponse?.data;
        
        if (commitData?.files && commitData.files.length > 0) {
          const file = commitData.files[0];
          return {
            firstName: file.filename,
            firstUrl: file.blob_url,
            firstDate: formatDate(commitData.commit.author.date)
          };
        }
      }
    }
    
    console.log('Nenhum evento válido encontrado');
    return null;
    
  } catch (error) {
    console.error('Erro em lastPost:', error);
    return null;
  }
};