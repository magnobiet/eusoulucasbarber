import { isValidBrazilianPhone } from '.';

const BRAZILIAN_AREA_CODES = [
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '21',
  '22',
  '24',
  '27',
  '28',
  '31',
  '32',
  '33',
  '34',
  '35',
  '37',
  '38',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '51',
  '53',
  '54',
  '55',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '71',
  '73',
  '74',
  '75',
  '77',
  '79',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '98',
  '99',
] as const;

describe('isValidBrazilianPhone', () => {
  it.each(BRAZILIAN_AREA_CODES)(
    'accepts a valid mobile phone from area code %s',
    (areaCode) => {
      expect(isValidBrazilianPhone(`(${areaCode}) 99999-9999`)).toBe(true);
    },
  );

  it('accepts a valid Brazilian landline number', () => {
    expect(isValidBrazilianPhone('(11) 3333-3333')).toBe(true);
  });

  it.each([
    '(08) 47897-8978',
    '(11) 89999-9999',
    '(11) 9999-999',
    '+1 213 373 4253',
  ])('rejects the invalid Brazilian phone number %s', (phone) => {
    expect(isValidBrazilianPhone(phone)).toBe(false);
  });
});
