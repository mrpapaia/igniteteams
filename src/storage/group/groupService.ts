import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

async function saveGroup(name: string) {
  try {
    const storedGroups = await listGroups();
    if (storedGroups.includes(name)) {
      throw new AppError("Já existe um group cadastrado com esse nome.");
    }

    const storage = JSON.stringify([...storedGroups, name]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}

async function listGroups() {
  try {
    const storedGroups = await AsyncStorage.getItem(GROUP_COLLECTION);
    const groups: string[] = storedGroups ? JSON.parse(storedGroups) : [];
    return groups;
  } catch (error) {
    throw error;
  }
}
async function removeGroup(name: string) {
  try {
    const stored = await listGroups();
    const storage = stored.filter((group) => group !== name);
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(storage));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${name}`);
  } catch (error) {
    throw error;
  }
}

export { saveGroup, listGroups, removeGroup };
