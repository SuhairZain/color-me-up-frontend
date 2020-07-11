import React, { PureComponent } from "react";

import "./App.css";

class App extends PureComponent<{}, never> {
    render() {
        return (
            <div className="App">
                <div>
                    {[0, 1, 2, 3].map((_, i) => {
                        return (
                            <div
                                className="Row"
                                key={i}
                                style={{
                                    flexDirection: "row",
                                    marginTop: i === 0 ? 0 : 8,
                                }}
                            >
                                {[0, 1, 2, 3].map((_, j) => {
                                    return (
                                        <div
                                            className="Tile"
                                            key={j}
                                            style={{
                                                height: 40,
                                                width: 40,
                                                backgroundColor: "red",
                                                marginLeft: j === 0 ? 0 : 8,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default App;
