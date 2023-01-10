import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { PlayerDTO } from "./PlayerDTO";

function verifyPlayerExists(players: PlayerDTO[], name: string) {
  return players.filter((players) => players.name === name).length > 0;
}
async function savePlayer(player: PlayerDTO, group: string) {
  try {
    const storedPlayers = await listPlayers(group);
    if (verifyPlayerExists(storedPlayers, player.name)) {
      throw new AppError("Essa pessoa já esta adicionada em um time.");
    }

    const storage = JSON.stringify([...storedPlayers, player]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}

async function listPlayers(group: string): Promise<PlayerDTO[]> {
  try {
    const storedPlayers = await AsyncStorage.getItem(
      `${PLAYER_COLLECTION}-${group}`
    );

    return storedPlayers ? JSON.parse(storedPlayers) : [];
  } catch (error) {
    throw error;
  }
}

async function findByTeam(group: string, team: string) {
  try {
    const storedPlayers = await listPlayers(group);

    return storedPlayers.filter((player) => player.team === team);
  } catch (error) {
    throw error;
  }
}

async function removePlayer(name: string, group: string) {
  try {
    const storedPlayers = await listPlayers(group);
    const storage = storedPlayers.filter((player) => player.name !== name);
    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(storage)
    );
  } catch (error) {}
}

export { removePlayer, savePlayer, listPlayers, findByTeam };
