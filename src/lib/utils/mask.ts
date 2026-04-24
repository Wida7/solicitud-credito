export function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;

  return name[0] + "***@" + domain;
}

export function maskPhone(phone: string) {
  if (phone.length < 4) return phone;

  return phone.slice(0, 2) + "****" + phone.slice(-2);
}