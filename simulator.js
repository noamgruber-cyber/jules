const initSimulator = () => {
    const runBtn = document.getElementById('run-sim-btn');
    const canvas = document.getElementById('sim-canvas');
    if (!runBtn || !canvas) return;

    const ctx = canvas.getContext('2d');
    const STARTING_BALANCE = 10000;
    const NUM_SIMULATIONS = 5;

    runBtn.addEventListener('click', () => {
        const winRate = parseFloat(document.getElementById('sim-win-rate').value) / 100;
        const avgWin = parseFloat(document.getElementById('sim-avg-win').value);
        const avgLoss = parseFloat(document.getElementById('sim-avg-loss').value);
        const numTrades = parseInt(document.getElementById('sim-trades').value);

        if (isNaN(winRate) || isNaN(avgWin) || isNaN(avgLoss) || isNaN(numTrades)) {
            alert('Please enter valid numbers for the simulation.');
            return;
        }

        // Calculate Expectancy
        const expectancy = (winRate * avgWin) - ((1 - winRate) * avgLoss);
        document.getElementById('sim-expectancy').innerText = expectancy.toFixed(2);

        let bestEndingBalance = -Infinity;
        let worstEndingBalance = Infinity;

        // Clear Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid lines
        drawGrid(ctx, canvas);

        const simulations = [];

        // Determine min/max for scaling while running simulations
        // ⚡ Bolt Optimization: Calculate min/max in single pass to avoid O(n^2) nested loop overhead
        let maxBal = STARTING_BALANCE;
        let minBal = STARTING_BALANCE;

        // Run simulations
        for (let s = 0; s < NUM_SIMULATIONS; s++) {
            let balance = STARTING_BALANCE;
            const history = [balance];

            for (let t = 0; t < numTrades; t++) {
                const isWin = Math.random() < winRate;
                if (isWin) {
                    balance += avgWin;
                } else {
                    balance -= avgLoss;
                }
                history.push(balance);

                // Track min and max continuously
                if(balance > maxBal) maxBal = balance;
                if(balance < minBal) minBal = balance;
            }

            simulations.push(history);

            if (balance > bestEndingBalance) bestEndingBalance = balance;
            if (balance < worstEndingBalance) worstEndingBalance = balance;
        }

        // Add padding to scales
        const range = maxBal - minBal;
        maxBal += range * 0.1;
        minBal -= range * 0.1;
        // Don't let min balance drop below 0 on the chart unless they go into debt
        if(minBal < 0 && worstEndingBalance > 0) minBal = 0;

        // Draw simulations
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];

        simulations.forEach((history, idx) => {
            ctx.beginPath();
            ctx.strokeStyle = colors[idx % colors.length];
            ctx.lineWidth = 2;

            history.forEach((bal, step) => {
                const x = (step / numTrades) * canvas.width;
                // Invert Y axis because canvas 0,0 is top-left
                const normalizedY = (bal - minBal) / (maxBal - minBal);
                const y = canvas.height - (normalizedY * canvas.height);

                if (step === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
        });

        document.getElementById('sim-best').innerText = bestEndingBalance.toFixed(2);
        document.getElementById('sim-worst').innerText = worstEndingBalance.toFixed(2);
        document.getElementById('sim-results').style.display = 'block';
    });
};

const drawGrid = (ctx, canvas) => {
    ctx.strokeStyle = '#333333'; // For dark mode compatibility
    ctx.lineWidth = 0.5;

    // Draw horizontal lines
    for(let i = 0; i <= 4; i++) {
        ctx.beginPath();
        const y = (i / 4) * canvas.height;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

document.addEventListener('DOMContentLoaded', initSimulator);