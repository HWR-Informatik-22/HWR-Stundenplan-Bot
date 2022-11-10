export function isToday(someDate: Date) {
  var today = new Date();
  today.setDate(today.getDate());

  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
}
