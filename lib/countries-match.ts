import countriesCode from '@/data/location/countriesCode.json'
import parsePhoneNumber from 'libphonenumber-js';

const countryNameToCode = countriesCode;

export const isMatchedCountry = (country: string, phone: string) => {

    const countryCode = countryNameToCode[country as keyof typeof countryNameToCode];

    const parsedPhoneNumber = parsePhoneNumber(phone);

    // Check if the country code matches
    if (parsedPhoneNumber && parsedPhoneNumber.country !== countryCode) {
        return false;
    }

    return true;
}