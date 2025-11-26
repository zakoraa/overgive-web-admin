export async function uploadCampaignThumbnail(file: File) {
  const form = new FormData();
  form.append("file", file);

  
  const res = await fetch("/api/campaign/upload-thumbnail", {
    method: "POST",
    body: form,
  });

  return res.json();
}
