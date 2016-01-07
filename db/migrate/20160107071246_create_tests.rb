class CreateTests < ActiveRecord::Migration
  def change
    change_table :tests do |t|
      t.string :newstring
    end
  end
end
