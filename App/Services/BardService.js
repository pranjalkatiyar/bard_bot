import axios from "axios";
import { API_KEY } from "react-native-dotenv";

export default genrateResponse = async (text) => {
  const context = "";
  const examples = [];

  if (text.trim() === "") return;
  const apiUrl =
    "https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage";
  const requestData = {
    top_k: 40,
    top_p: 0.95,
    prompt: {
      context: context,
      examples: examples,
      messages: [{ content: text }],
    },
    temperature: 0.25,
    top_k: 40,
    top_p: 0.95,
    candidate_count: 1,
  };

  const header = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(
      `${apiUrl}?key=${API_KEY}`,
      requestData,
      header
    );

    if (response.status === 200) {
      if (
        response.data &&
        response.data.candidates &&
        response.data.candidates.length > 0
      ) {
        const botResponse = response.data.candidates[0].content;
        return botResponse;
      } else {
        console.error("Response structure is not correct", error);
      }
    } else {
      console.error("Response status is not 200", error);
    }
  } catch (error) {
    console.log("AN error occured", error);
  }
};
