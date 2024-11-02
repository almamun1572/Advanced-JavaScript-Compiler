onmessage = function(event) {
    const code = event.data;
    let result = "";

    const customConsole = {
        log: function(message) {
            result += message + "\n";
        }
    };

    try {
        const script = new Function("console", code);
        
        // Timeout simulation to detect infinite loops
        const timeoutId = setTimeout(() => {
            throw new Error("Execution timed out: Potential infinite loop detected.");
        }, 2000);

        script(customConsole);
        clearTimeout(timeoutId); // Clear timeout if code finishes
        
        postMessage(result || "Code executed successfully without output.");
    } catch (error) {
        postMessage(`Error: ${error.message}\n\nLocation:\n${error.stack}`);
    }
};
