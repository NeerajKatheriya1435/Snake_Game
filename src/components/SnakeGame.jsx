import React, { useEffect, useRef, useState } from 'react'
import "./snakeGame.css"
const SnakeGame = () => {
    const initialSnake = [[6, 6], [5, 6], [4, 6]]
    const [snakeBody, setSnakeBody] = useState(initialSnake)

    let scoreRef = useRef(0)
    const directionRef = useRef([1, 0])

    const gridSize = 20;
    const gameGrid = Array.from({ length: gridSize }, () => {

        return new Array(gridSize).fill("");
    })

    const generateFood = () => {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        return [x, y]
    }
    const foodRef = useRef(generateFood());
    const isSnakeBody = (xc, yc) => {
        return snakeBody.some(([x, y]) => {
            return (x === xc && y === yc);
        })
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSnakeBody((preSnakeBody) => {

                const newHeadBody = [
                    preSnakeBody[0][0] + directionRef.current[0],
                    preSnakeBody[0][1] + directionRef.current[1]
                ];
                if (newHeadBody[0] < 0 || newHeadBody[0] >= gridSize || newHeadBody[1] < 0 || newHeadBody[1] >= gridSize ||
                    preSnakeBody.some(([x, y]) => {
                        return (newHeadBody[0] === x && newHeadBody[1] === y);
                    })
                ) {
                    directionRef.current = [1, 0]
                    scoreRef.current = scoreRef.current - scoreRef.current;
                    return (initialSnake)
                }
                const copySnakeBody = preSnakeBody.map((arr) => [...arr]);

                if (newHeadBody[0] === foodRef.current[0] &&
                    newHeadBody[1] === foodRef.current[1]
                ) {
                    foodRef.current = generateFood();
                    scoreRef.current = scoreRef.current + 1;
                    console.log(scoreRef.current)
                }
                else {
                    copySnakeBody.pop();
                }

                copySnakeBody.unshift(newHeadBody);
                return copySnakeBody;
            })
        }, 300);
        const handleDirection = (e) => {
            if (e.key == "ArrowUp" && directionRef.current[1] != 1) {
                directionRef.current = [0, -1]
            }
            else if (e.key == "ArrowDown" && directionRef.current[1] != -1) {
                directionRef.current = [0, 1]
            }
            else if (e.key == "ArrowLeft" && directionRef.current[0] != 1) {
                directionRef.current = [-1, 0]
            }
            else if (e.key == "ArrowRight" && directionRef.current[0] != -1) {
                directionRef.current = [1, 0]
            }
        }
        window.addEventListener("keydown", handleDirection)

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("keydown", handleDirection);
        }
    }, [])

    return (
        <div className='ourGame'>
            <h1 className="heading">Welcome To Snake Game !!!</h1>
            <div className="container">
                {gameGrid.map((row, yc) => {
                    return row.map((cell, xc) =>
                        <div className={`cell ${isSnakeBody(xc, yc) ? "snake" : ""} ${(foodRef.current[0] === xc && foodRef.current[1] === yc) ? "food" : ""}`}></div>
                    )
                })}
            </div>
            <div className="score">Score - {scoreRef.current}</div>
        </div>
    )
}

export default SnakeGame