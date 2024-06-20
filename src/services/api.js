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
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const lastPost = async () => {
  const requestURL = "https://api.github.com/users/ProfMLE/events";

  try {
    const response = await axios.get(requestURL);
    const data = response.data;
    const elementos = data.filter((item) => item.repo.name === "ProfMLE/Rep01");

    if (elementos.length > 0) {
      const first = elementos[0].payload.commits[0].url;      
      const finalData = await axios.get(first)  ;
      const finalElements = finalData.data
      const firstDate = formatDate(finalElements.commit.author.date)
      const firstName=finalElements.files[0].filename
      const firstUrl=finalElements.files[0].blob_url
      return {firstName,firstUrl, firstDate}
       
    } else {
      console.log(
        "Nenhum evento PushEvent encontrado para o repositório ProfMLE/Rep01."
      );
      return null; 
    }
  } catch (error) {
    console.error("Erro:", error);
    throw error; 
  }
};