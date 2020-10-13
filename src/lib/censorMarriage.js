const censorMarriage = (marriage, roles) => {
  const censorField = (redact, value) => {
    return marriage.status.blocked !== false || (redact && !roles.includes('full-details')) ?
      null : value
  }
  return {
    id: marriage.id,
    entryNumber: censorField(true, marriage.entryNumber),
    dateOfMarriage: censorField(false, marriage.dateOfMarriage),
    placeOfMarriage: {
      address: censorField(false, marriage.placeOfMarriage.address),
      parish: censorField(false, marriage.placeOfMarriage.parish),
      short: censorField(true, marriage.placeOfMarriage.short)
    },
    registrar: {
      signature: censorField(true, marriage.registrar.signature),
      designation: censorField(true, marriage.registrar.designation),
      superintendentSignature: censorField(true, marriage.registrar.superintendentSignature),
      superintendentDesignation: censorField(true, marriage.registrar.superintendentDesignation),
      district: censorField(false, marriage.registrar.district),
      administrativeArea: censorField(false, marriage.registrar.administrativeArea)
    },
    groom: {
      prefix: censorField(true, marriage.groom.prefix),
      forenames: censorField(false, marriage.groom.forenames),
      surname: censorField(false, marriage.groom.surname),
      suffix: censorField(true, marriage.groom.suffix),
      age: censorField(true, marriage.groom.age),
      occupation: censorField(true, marriage.groom.occupation),
      retired: censorField(true, marriage.groom.retired),
      address: censorField(false, marriage.groom.address),
      aliases: censorField(true, marriage.groom.aliases) || [],
      condition: censorField(true, marriage.groom.condition),
      signature: censorField(true, marriage.groom.signature),
      signatureIsMark: censorField(true, marriage.groom.signatureIsMark)
    },
    bride: {
      prefix: censorField(true, marriage.bride.prefix),
      forenames: censorField(false, marriage.bride.forenames),
      surname: censorField(false, marriage.bride.surname),
      suffix: censorField(true, marriage.bride.suffix),
      age: censorField(true, marriage.bride.age),
      occupation: censorField(true, marriage.bride.occupation),
      retired: censorField(true, marriage.bride.retired),
      address: censorField(false, marriage.bride.address),
      aliases: censorField(true, marriage.bride.aliases) || [],
      condition: censorField(true, marriage.bride.condition),
      signature: censorField(true, marriage.bride.signature),
      signatureIsMark: censorField(true, marriage.bride.signatureIsMark)
    },
    fatherOfGroom: {
      forenames: censorField(true, marriage.fatherOfGroom.forenames),
      surname: censorField(true, marriage.fatherOfGroom.surname),
      occupation: censorField(true, marriage.fatherOfGroom.occupation),
      retired: censorField(true, marriage.fatherOfGroom.retired),
      designation: censorField(true, marriage.fatherOfGroom.designation),
      deceased: censorField(true, marriage.fatherOfGroom.deceased)
    },
    fatherOfBride: {
      forenames: censorField(true, marriage.fatherOfBride.forenames),
      surname: censorField(true, marriage.fatherOfBride.surname),
      occupation: censorField(true, marriage.fatherOfBride.occupation),
      retired: censorField(true, marriage.fatherOfBride.retired),
      designation: censorField(true, marriage.fatherOfBride.designation),
      deceased: censorField(true, marriage.fatherOfBride.deceased)
    },
    witness1: {
      signature: censorField(true, marriage.witness1.signature),
      signatureIsMark: censorField(true, marriage.witness1.signatureIsMark)
    },
    witness2: {
      signature: censorField(true, marriage.witness2.signature),
      signatureIsMark: censorField(true, marriage.witness2.signatureIsMark)
    },
    witness3: {
      signature: censorField(true, marriage.witness3.signature),
      signatureIsMark: censorField(true, marriage.witness3.signatureIsMark)
    },
    witness4: {
      signature: censorField(true, marriage.witness4.signature),
      signatureIsMark: censorField(true, marriage.witness4.signatureIsMark)
    },
    witness5: {
      signature: censorField(true, marriage.witness5.signature),
      signatureIsMark: censorField(true, marriage.witness5.signatureIsMark)
    },
    witness6: {
      signature: censorField(true, marriage.witness6.signature),
      signatureIsMark: censorField(true, marriage.witness6.signatureIsMark)
    },
    witness7: {
      signature: censorField(true, marriage.witness7.signature),
      signatureIsMark: censorField(true, marriage.witness7.signatureIsMark)
    },
    witness8: {
      signature: censorField(true, marriage.witness8.signature),
      signatureIsMark: censorField(true, marriage.witness8.signatureIsMark)
    },
    witness9: {
      signature: censorField(true, marriage.witness9.signature),
      signatureIsMark: censorField(true, marriage.witness9.signatureIsMark)
    },
    witness10: {
      signature: censorField(true, marriage.witness10.signature),
      signatureIsMark: censorField(true, marriage.witness10.signatureIsMark)
    },
    witness11: {
      signature: censorField(true, marriage.witness11.signature),
      signatureIsMark: censorField(true, marriage.witness11.signatureIsMark)
    },
    witness12: {
      signature: censorField(true, marriage.witness12.signature),
      signatureIsMark: censorField(true, marriage.witness12.signatureIsMark)
    },

    minister1: {
      signature: censorField(true, marriage.minister1.signature),
      designation: censorField(true, marriage.minister1.designation)
    },
    minister2: {
      signature: censorField(true, marriage.minister2.signature),
      designation: censorField(true, marriage.minister2.designation)
    },
    status: {
      blocked: marriage.status.blocked,
      correction: censorField(false, marriage.status.correction),
      marginalNote: censorField(false, marriage.status.marginalNote),
      onAuthorityOfRegistrarGeneral: censorField(true, marriage.status.onAuthorityOfRegistrarGeneral)
    },
    previousRegistration: marriage.previousRegistration && censorMarriage(marriage.previousRegistration, roles),
    nextRegistration: marriage.nextRegistration && censorMarriage(marriage.nextRegistration, roles),
  }
}
module.exports = censorMarriage;
