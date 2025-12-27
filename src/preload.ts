import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('chat', {
    sendMessage: (text: string) => ipcRenderer.invoke('agent-message', text),
    saveApiKey: (key: string) => ipcRenderer.invoke('save-api-key', key),
    checkApiKey: (callback: (hasKey: boolean) => void) => {
        ipcRenderer.invoke('has-api-key').then(callback);
    }
});
