export default (req, res) => {
  if (req.method === "POST") {
    const { answers } = req.body;

    if (!answers) return res.status(401).json({ msg: "Bad request!" });

    let SUB_J = null;

    // Get All Selected Substances Starting Selected from Q_1
    const allSelectedSubstancesLetters = {};
    answers.selectedSubstances_Q_1.map(item => {
      if (item.id === "J") SUB_J = item.name;
      allSelectedSubstancesLetters[item.id] = 0;
    });

    // Filter out any question array that is empty (FROM Q_2 to Q_7). e.g Q_5 : []; Q_5 will be removed
    const answeredQuestions_2_7 = [];

    Object.keys(answers).map(item => {
      // Exclude Q_1 and Q_8
      if (
        item === "selectedSubstances_Q_8" ||
        item === "selectedSubstances_Q_1"
      )
        return;
      if (answers[item].length)
        answeredQuestions_2_7.push({ name: item, answers: answers[item] });
    });

    // USE THESE VALUES BELOW TO CALCULATE CUMMULATIVE SCORES FOR EACH SUBSTACE SELCETED FROM Q_1
    // allSelectedSubstancesLetters,
    // answeredQuestions_2_7,

    answeredQuestions_2_7.map(x => {
      x.answers.map(i => {
        allSelectedSubstancesLetters[i.id] =
          allSelectedSubstancesLetters[i.id] + parseInt(i.value);
      });
    });

    // covert the values of allSelectedSubstancesLetters into array
    const data = Object.keys(allSelectedSubstancesLetters).map(item => ({
      substance: item,
      value: allSelectedSubstancesLetters[item],
    }));

    const getRiskLevels = data.map(item => ({
      substance: item.substance,
      value: item.value,
      riskLevel: getRiskLevelForEactSubstance(item.substance, item.value),
    }));

    return res.json({
      Q_8: answers.selectedSubstances_Q_8.patternOfInjecting,
      getRiskLevels,
      SUB_J,
    });
  }

  return res.status(401).json({ msg: "Bad request!" });
};

const getRiskLevelForEactSubstance = (sub, value) => {
  const riskLevels = ["Low", "Moderate", "High"];
  value = parseInt(value);

  if (sub === "B") {
    if (value <= 10) return "Low";
    if (value <= 26) return "Moderate";
    if (value > 26) return "High";
  } else {
    if (value <= 3) return "Low";
    if (value <= 26) return "Moderate";
    if (value > 26) return "High";
  }
};
