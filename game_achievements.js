// JS helper for game_achievements.json
async function fetchGameAchievements() {
    const res = await fetch('game_achievements.json');
    return await res.json();
}
