// src/components/Questionnaire.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Questionnaire = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tests/questions/')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the questions!', error);
            });
    }, []);

    const handleAnswerChange = (questionId, answerId) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answerId
        }));
    };

    const handleSubmit = () => {
        const userAnswers = Object.keys(answers).map(questionId => ({
            question: parseInt(questionId, 10),  // Преобразование ID вопроса в целое число
            answer: answers[questionId]
        }));

        axios.post('http://127.0.0.1:8000/api/tests/user-answers/', userAnswers)
            .then(response => {
                navigate('/result');
            })
            .catch(error => {
                console.error('There was an error submitting the answers!', error);
            });
    };

    return (
        <div>
            <h2>Questionnaire</h2>
            {questions.map(question => (
                <div key={question.id}>
                    <h4>{question.text}</h4>
                    {question.answers.length === 2 && question.answers.map(answer => (
                        <div key={answer.id}>
                            <input
                                type="radio"
                                id={`answer-${answer.id}`}
                                name={`question-${question.id}`}
                                value={answer.id}
                                onChange={() => handleAnswerChange(question.id, answer.id)}
                            />
                            <label htmlFor={`answer-${answer.id}`}>{answer.text}</label>
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Questionnaire;
