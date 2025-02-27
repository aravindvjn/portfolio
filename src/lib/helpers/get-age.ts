export function getMyAge() {
    const birthDate = new Date(2002, 11, 3);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
  
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
    if (!hasBirthdayPassed) {
      age--;
    }
  
    return age;
  }
  
  