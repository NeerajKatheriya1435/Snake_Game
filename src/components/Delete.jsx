import React, { useEffect, useRef, useState } from 'react'
import "./snakeGame.css"
const SnakeGame = () => {
    const [snakeBody, setSnakeBody] = useState([
        [3, 5],
        [2, 5],
        [1, 5],
    ])
    const directionRef = useRef([1, 0])
    const gridSize = 15;
    const gameGrid = Array.from({ length: gridSize }, () => {

        return new Array(gridSize).fill("");
    })
    console.log(gameGrid)

    const isSnakeBody = (xc, yc) => {
        return snakeBody.some(([x, y]) => {
            return (x === xc && y === yc);
        })
    }
    useEffect(() => {
        setInterval(() => {
            setSnakeBody((preSnakeBody) => {

                const newHeadBody = [
                    preSnakeBody[0][0] + directionRef.current[0],
                    preSnakeBody[0][1] + directionRef.current[1]
                ];
                if (newHeadBody[0] <= -1 || newHeadBody[0] >= gridSize || newHeadBody[1] <= -1 || newHeadBody[1] >= gridSize) {
                    return ([
                        [3, 5],
                        [2, 5],
                        [1, 5],
                    ])
                }
                const copySnakeBody = preSnakeBody.map((arr) => [...arr]);
                copySnakeBody.pop();
                copySnakeBody.unshift(newHeadBody);
                return copySnakeBody;
            })
        }, 800);
        const handleDirection = (e) => {
            if (e.key == "ArrowUp") {
                directionRef.current = [0, -1]
            }
            else if (e.key == "ArrowDown") {
                directionRef.current = [0, 1]
            }
            else if (e.key == "ArrowLeft") {
                directionRef.current = [-1, 0]
            }
            else if (e.key == "ArrowRight") {
                directionRef.current = [1, 0]
            }
        }
        window.addEventListener("keydown", handleDirection)
    }, [])

    return (
        <div>
            <h1 className="heading">Welcome To Snake Game !!!</h1>
            <div className="container">
                {gameGrid.map((row, yc) => {
                    return row.map((cell, xc) =>
                        <div className={`cell ${isSnakeBody(xc, yc) ? "snake" : ""}`}></div>
                    )
                })}
            </div>
        </div>
    )
}

export default SnakeGame