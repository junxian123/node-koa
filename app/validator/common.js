const { LinValidator, Rule} = require('../core/lin-validator')
class PositiveIdValidator extends LinValidator{
  id = [
    new Rule('isInt',"必须是正整数",{min:1})
  ]

}

module.exports = {
  PositiveIdValidator
}