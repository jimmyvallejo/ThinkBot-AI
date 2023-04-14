import { useEffect, useState, useRef } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Dna } from "react-loader-spinner";

const Chat = () => {
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  async function getChatCompletion(messages) {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a school tutor treat me as if i am student that needs help with an assignment or homework. ",
          },
          ...messages,
        ],
      });

      return {
        jsonBody: {
          completion: completion.data.choices[0].message,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        jsonBody: { completion: "Error: Unable to fetch response from API." },
      };
    }
  }

  const [userInput, setUserInput] = useState("");

  const [conversation, setConversation] = useState([]);

  const [isLoading, setLoading] = useState(null);

  const containerRef = useRef(null);

  const [classSubject, setSubject] = useState("");

  const [showChat, setShowChat] = useState(null);

  const setTutor = (subject) => {
    if (subject === "math") {
      setSubject("do not give me the answer only explain to me the logic");
      setShowChat(true);
    } else if (subject === "history") {
        setSubject("")
        setShowChat(true);
    } else if (subject ==="science") {
        setSubject("explain this to me in a way that uses real world examples")
        setShowChat(true);
    } else if (subject === "literature") {
        setSubject("help me with writing and literature ideas only, do not write entire stories or poems for me")
        setShowChat(true);
    }
    
  };

  const [age, setAge] = useState("");

  const grade = (grade) => {
    setAge(` also answer this as if im a ${grade} school student`);
  };

  useEffect(() => {
    const fetchFirst = async () => {
      try {
        const messages = [
          {
            role: "user",
            content:
              "Please greet me as if I am a student who just walked in to class.",
          },
        ];
        const result = await getChatCompletion(messages);
        console.log(result.jsonBody.completion.content);
        setConversation([
          { role: "user", content: messages[0].content },
          {
            role: "assistant",
            content: result.jsonBody.completion.content,
          },
        ]);
      } catch (error) {
        console.error("Error fetching first response:", error);
      }
    };

    fetchFirst();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const scrollToBottom = () => {
    if (!isLoading) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let subjectAdded = userInput.concat(" ", classSubject);

    let finalSubmit = subjectAdded.concat(" ", age);
    console.log(finalSubmit)

    const result = await getChatCompletion(
      conversation.concat([{ role: "user", content: finalSubmit }])
    );
    setConversation((prevConversation) => [
      ...prevConversation,
      { role: "user", content: userInput },
      {
        role: "assistant",
        content: result.jsonBody.completion.content,
      },
    ]);
    setLoading(null);
    setUserInput("");
  };

  const handleChange = () => {
    setShowChat(null)
    setSubject('')
  }

  return (
    <div className="GPT">
      <h1 className="MD">AI Tutor</h1>
      {!showChat ? (
        <div>
          <div className="buttons">
            <button onClick={() => setTutor("math")}>Math</button>
            <button onClick={() => setTutor("history")}>History</button>
            <button onClick={() => setTutor("science")}>Science</button>
            <button onClick={() => setTutor("literature")}>Literature</button>
          </div>
          <div className="buttons">
            <button onClick={() => grade("elementary")}>
              Elementary School
            </button>
            <button onClick={() => grade("middle")}>Middle School</button>
            <button onClick={() => grade("high")}>High School</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="response">
            {isLoading ? (
              <div className="loader-container">
                <Dna className="dna" color="#00BFFF" height={100} width={100} />
              </div>
            ) : (
              conversation.slice(1).map((elem, index) => {
                return (
                  <p key={index}>
                    <strong>
                      {elem.role === "user" ? "You: " : "AI Tutor: "}
                    </strong>
                    {elem.content}
                  </p>
                );
              })
            )}
          </div>
          <div className="form" ref={containerRef}>
            <form className="submitForm" onSubmit={handleSubmit}>
              <textarea
                className="input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="How could I help you today?"
                rows={4}
              />
              <button className="submit" type="submit">
                Submit
              </button>
            </form>
            <button className="newSubject" onClick={() => handleChange()}>
              Select new subject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;