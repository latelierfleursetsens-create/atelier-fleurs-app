const FOLDER_NAME = "Sauvegardes Atelier Fleurs & Sens";
const BACKUP_TOKEN = "atelier-fleurs-sauvegarde-2026";
const MAX_BACKUPS = 365;

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);

    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (!payload.token || payload.token !== BACKUP_TOKEN) {
      return jsonResponse({ success: false, error: "Token invalide" });
    }

    const folder = getOrCreateFolder(FOLDER_NAME);
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const dateKey = `${yyyy}-${mm}-${dd}`;
    const filename = `sauvegarde-atelier-fleurs-${dateKey}.json`;

    const content = JSON.stringify({
      savedAt: date.toISOString(),
      dateKey: dateKey,
      source: "L'Atelier Fleurs & Sens",
      retentionDays: 365,
      data: payload.data
    }, null, 2);

    // Une seule sauvegarde physique par jour.
    // Si plusieurs appareils appellent le script, le ScriptLock sérialise les appels.
    // On met à jour le fichier du jour au lieu d'en créer un nouveau.
    const existingToday = getTodayBackups(folder, dateKey);
    let targetFile = null;
    let replaced = false;

    if (existingToday.length > 0) {
      targetFile = existingToday[0];
      targetFile.setContent(content);
      if (targetFile.getName() !== filename) targetFile.setName(filename);
      replaced = true;

      // Nettoie aussi les doublons historiques éventuels de la même journée.
      for (let i = 1; i < existingToday.length; i++) {
        existingToday[i].setTrashed(true);
      }
    } else {
      targetFile = folder.createFile(filename, content, MimeType.PLAIN_TEXT);
    }

    // Rétention glissante : 365 sauvegardes quotidiennes maximum.
    // À la 366e journée, seule la plus ancienne part à la corbeille.
    cleanOldBackups(folder, MAX_BACKUPS);

    return jsonResponse({
      success: true,
      replaced: replaced,
      filename: targetFile.getName(),
      retentionDays: 365,
      maxBackups: MAX_BACKUPS,
      message: replaced
        ? "Sauvegarde du jour mise à jour dans Google Drive"
        : "Sauvegarde quotidienne créée dans Google Drive"
    });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};

    if (!params.token || params.token !== BACKUP_TOKEN) {
      return jsonResponse({ success: false, error: "Token invalide" });
    }

    const action = params.action || "latest";
    const folder = getOrCreateFolder(FOLDER_NAME);

    if (action === "latest") {
      const latestFile = getLatestBackup(folder);

      if (!latestFile) {
        return jsonResponse({ success: false, error: "Aucune sauvegarde trouvée dans Google Drive" });
      }

      const text = latestFile.getBlob().getDataAsString();
      const data = JSON.parse(text);

      return jsonResponse({
        success: true,
        filename: latestFile.getName(),
        updatedAt: latestFile.getLastUpdated().toISOString(),
        data: data
      });
    }

    if (action === "list") {
      const files = getBackupFiles(folder).slice(0, MAX_BACKUPS).map(function(file) {
        return {
          id: file.getId(),
          name: file.getName(),
          createdAt: file.getDateCreated().toISOString(),
          updatedAt: file.getLastUpdated().toISOString()
        };
      });

      return jsonResponse({ success: true, files: files });
    }

    return jsonResponse({ success: false, error: "Action inconnue" });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

function getBackupFiles(folder) {
  const files = [];
  const iterator = folder.getFiles();

  while (iterator.hasNext()) {
    const file = iterator.next();
    const name = file.getName().toLowerCase();
    if (name.endsWith(".json") && name.indexOf("sauvegarde-atelier-fleurs-") === 0) {
      files.push(file);
    }
  }

  files.sort(function(a, b) {
    return b.getDateCreated() - a.getDateCreated();
  });

  return files;
}

function getTodayBackups(folder, dateKey) {
  return getBackupFiles(folder).filter(function(file) {
    return file.getName().indexOf("sauvegarde-atelier-fleurs-" + dateKey) === 0;
  });
}

function getLatestBackup(folder) {
  const files = getBackupFiles(folder);
  return files.length ? files[0] : null;
}

function cleanOldBackups(folder, maxFiles) {
  const files = getBackupFiles(folder);

  for (let i = maxFiles; i < files.length; i++) {
    files[i].setTrashed(true);
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
