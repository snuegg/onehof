class CreateTest2s < ActiveRecord::Migration
  def change
    create_table :test2s do |t|
      t.integer :test2
      t.integer :Test_id
      t.timestamps
    end
  end
end
