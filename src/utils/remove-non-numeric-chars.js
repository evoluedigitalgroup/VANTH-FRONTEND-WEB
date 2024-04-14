export default function removeNonNumericChars(str) {
    return str?.replace(/[^0-9]/g, '') || "";
}